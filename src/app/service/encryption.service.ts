import {Injectable} from '@angular/core';
import {NgxIndexedDB} from 'ngx-indexed-db';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  public chatPairMap = new Map();
  private connection = null;
  public static decryptMessage(secret, messageText) {
    return CryptoJS.AES.decrypt(messageText, secret.key).toString(CryptoJS.enc.Utf8);
  }
  public static encryptMessage(secret, messageText) {
    return CryptoJS.AES.encrypt(messageText, secret.key).toString();
  }
  constructor() { }

  async generateKeyPair() {
    const pair =  await crypto.subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: 'P-384'
      },
      true,
      ['deriveKey']
    );
    return pair;
  }
  public async deriveSecretKey(privateKey, pubKey) {
    const publicKey = await crypto.subtle.importKey('jwk', pubKey, { name: 'ECDH', namedCurve: 'P-384' }, true, []);
    return await crypto.subtle.deriveKey(
      {
        name: 'ECDH',
        public: publicKey
      },
      privateKey,
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
  }
  public async getChatSecret(chatId) {
    const db = await new NgxIndexedDB('keystore', 2);
    const found = await db.openDatabase(2, evt => {
      const objectStore = evt.currentTarget.result.createObjectStore('keys', {keyPath: 'id', autoIncrement: true});
      objectStore.createIndex('chatId', 'chatId', {unique: true});
      objectStore.createIndex('key', 'key', {unique: false});
    }).then(() => {
      return db.getAll('keys').then(
        keys => {
          return keys.find((el) => {
            return el.chatId === chatId;
          });
        },
        error => {
          console.log(error);
        }
      );
    });
    return found;
  }
  public async generateSecret(keyPair, pub, chatID) {
    const secretKey = await this.deriveSecretKey(keyPair.privateKey, pub);
    const exportedSecret = await crypto.subtle.exportKey('jwk', secretKey);
    const stringifiedKey = exportedSecret.k;
    const db = await new NgxIndexedDB('keystore', 2);
    db.openDatabase(2, evt => {
      const objectStore = evt.currentTarget.result.createObjectStore('keys', {keyPath: 'id', autoIncrement: true});
      objectStore.createIndex('chatId', 'chatId', {unique: true});
      objectStore.createIndex('key', 'key', {unique: false});
    }).then(() => {
      db.getAll('keys').then(
        keys => {
        const exists = keys.some((el) => {
          return el.chatId === chatID;
        });
        if (!exists) {
          db.add('keys', {chatId: chatID, key: stringifiedKey}).then(() => {
            console.log('Secret key added.');
          });
        } else {
          console.log('Got an existing chat secret. Ignoring.');
        }
      },
        error => {
          console.log(error);
        }
      );
    });
    return secretKey;
  }
  public async handleExchange(msg, connection) {
    this.connection = connection;
    if (this.chatPairMap.has(msg.param1)) {
      this.generateSecret(this.chatPairMap.get(msg.param1), this.strToJson(msg.param2), msg.param1);
    } else {
      const pair = await this.generateKeyPair();
      this.chatPairMap.set(msg.param1, pair);
      this.sendSocketMessage(msg.param1, this.chatPairMap.get(msg.param1).publicKey, 'ENCRYPTION_PUBLIC_KEY_EXCHANGE');
      this.generateSecret(this.chatPairMap.get(msg.param1), this.strToJson(msg.param2), msg.param1);
    }
  }
  async sendSocketMessage(parameter1, parameter2, msgType: string) {
    const exportedKey = await crypto.subtle.exportKey('jwk', parameter2);
    this.connection.send({param1: parameter1, param2: this.jsonToStr(exportedKey), type: msgType});
  }
  private strToJson(str: string): JSON {
    str = str.substring(1, str.length - 1);
    return JSON.parse(str);
  }
  private jsonToStr(json): string {
    let stringified = JSON.stringify(json);
    stringified = '"' + stringified + '"';
    return stringified;
  }
}
