import os
import shutil
import subprocess


def deploy():
    print('1. Removing build folder')
    shutil.rmtree('./build')
    
    print('2. Compiling project to build folder')
    run_bash_cmd('tsc index.ts')

    print('3. Creating zip')
    run_bash_cmd('zip -r lambdabuild . ../node_modules', cwd='./build').wait()

    print('4. Uploading to AWS')
    run_bash_cmd('aws lambda update-function-code --function-name InquestCrud --zip-file fileb://lambdabuild.zip')

    print('5. Cleaning up')
    shutil.rmtree('./build')
    os.remove('lambdabuild.zip')


def run_bash_cmd(cmd, cwd='.'):
    subprocess.Popen(cmd, cwd=cwd).wait()


if __name__ == '__main__':
    deploy()