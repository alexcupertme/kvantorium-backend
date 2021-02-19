export default interface IUser {
  mail: string;
  login: string;
  password: string;
  name?: {
    first: string | undefined;
    second: string | undefined;
  };
  description?: string | undefined;
  skills?: [
    {
      id: Number | undefined;
      name: string | undefined;
      description: string | undefined;
    }
  ];
  achievements?: [{ name: string | undefined }];
  kvantums?: [
    {
      kvantum: string | undefined;
      level: string | undefined;
    }
  ];
  registerDate: Date;
  role: string;
}
