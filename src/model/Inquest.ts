interface Inquest {
  inquestID: number;
  sourceID: string;
  name: string;
  description: string;
  primary: boolean; // TODO: will boolean capture 0/1 values accurately?
}

export default Inquest;
