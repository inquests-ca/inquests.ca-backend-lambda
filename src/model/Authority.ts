interface Authority {
  authorityID: number;
  inquestID: number | null; // TODO: is the | operator or?
  name: string;
  description: string;
  primary: boolean; // TODO: will boolean capture 0/1 values accurately?
}

export default Authority;
