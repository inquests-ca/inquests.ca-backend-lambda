import * as aws from 'aws-sdk';

const client = new aws.SecretsManager({ region: 'us-east-1' });

export const getSecret = (secretName): Promise<string> =>
  new Promise<string>((reject, resolve) =>
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      // TODO: handle error gracefully.
      if (err) {
        console.log(`FAILED TO RETRIEVE SECRET: ${err.code}, ${err.message}`);
        throw err;
      }
      if (!('SecretString' in data)) {
        console.log('Secret string not in data.');
        throw new Error('bad');
      }
      resolve(data.SecretString);
    })
  );
