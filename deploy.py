import os
import shutil
import subprocess


FNULL = open(os.devnull, 'w')


# TODO: error handling
def deploy():
    build_path = os.path.abspath('./build')

    print('1. Removing build folder')
    if os.path.isdir(build_path):
        shutil.rmtree(build_path)
    
    print('2. Compiling project to build folder')
    os.mkdir(build_path)
    run_bash_cmd('tsc --outDir build index.ts')

    # TODO: avoid uploading entire node_modules folder everytime...
    print('3. Creating zip')
    run_bash_cmd('zip -r lambdabuild . ../node_modules', cwd=build_path, stdout=FNULL)

    print('4. Uploading to AWS')
    run_bash_cmd('aws lambda update-function-code --function-name InquestCrud --zip-file fileb://build/lambdabuild.zip')

    print('5. Cleaning up')
    shutil.rmtree(build_path)


def run_bash_cmd(cmd, cwd=None, stdout=None):
    args = cmd.split()
    subprocess.Popen(args, stdout=stdout, cwd=cwd).wait()


if __name__ == '__main__':
    deploy()
