export type AppConfig = {
    nodeEnv: string;
    name: string;
    port: number;
    apiPrefix: string;
    salt: string;
    saltRounds: number;
    pepper: string;
    jwtAccessSecret: string;
    accessTokenExpiresIn: string;
  };
  