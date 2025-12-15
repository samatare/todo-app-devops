pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                echo 'building the app'
            }
        }
       stage('test') {
            steps {
                echo 'testing the app'
            }
        }
       stage('deploy') {
            steps {
                script{
                def dockercmd ='docker run -p 3080:3080 -d samatare/react-nodejs-example_aws:1.0'
                echo 'deploying the app and ssh to the AWS'
                 sshagent(['ec2_server_key']) {
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@34.204.166.254 ${dockercmd} "
                    }

                }
            }
        }
    }
}
