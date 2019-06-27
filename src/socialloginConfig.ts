import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';

// export function getAuthServiceConfigs() {
//   const config = new AuthServiceConfig([
//     {
//       id: GoogleLoginProvider.PROVIDER_ID,
//       provider: new GoogleLoginProvider('820600559774-rogh42iso9644ohsprs6g5grb828v20n.apps.googleusercontent.com')
//     }
//   ]);
//
//   return config;
// }

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('820600559774-rogh42iso9644ohsprs6g5grb828v20n.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}
