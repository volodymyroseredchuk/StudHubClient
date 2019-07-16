import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LoginOpt
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

const fbLoginOptions: LoginOpt = {
  scope: 'public_profile, email',
  return_scopes: true,
  enable_profile_selector: true
}; 

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('820600559774-rogh42iso9644ohsprs6g5grb828v20n.apps.googleusercontent.com')
  },

  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('488187918662697', fbLoginOptions),
    
  }
]);

export function provideConfig() {
  return config;
}
