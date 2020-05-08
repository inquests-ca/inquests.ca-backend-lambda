import * as aws from 'aws-sdk';

const client = new aws.SecretsManager({ region: 'us-east-1' });

export const getSecret = (secretName): Promise<string> =>
  new Promise<string>((reject, resolve) => {
    console.log('Getting secret value in Promise');
    return client.getSecretValue({ SecretId: secretName }, (err, data) => {
      console.log('Callback executed');
      // TODO: handle error gracefully.
      if (err) {
        console.log(`FAILED TO RETRIEVE SECRET: ${err.code}, ${err.message}`);
        throw err;
      }
      if (!('SecretString' in data)) {
        console.log('Secret string not in data.');
        throw new Error('bad');
      }
      console.log('Resolving');
      resolve(data.SecretString);
    });
  });
