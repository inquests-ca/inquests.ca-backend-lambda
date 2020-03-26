// TODO: move all models into single file.
// TODO: auto-generate models.
interface Jurisdiction {
  jurisdictionID: string;
  sovereigntyID: string;
  subdivision: string | null;
  code: string;
}

export default Jurisdiction;
