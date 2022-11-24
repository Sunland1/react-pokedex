pipeline {
    agent any
    tools {
        nodejs "node 18"
    }
    
    environment {
        login = "Sunland"
        couleur = "red"
    }
    
    
    stages {
        
        stage('Use env var') {
            steps {
                echo "Login is ${LOGIN}"
                echo "Color is ${COULEUR}"
            }
        }
        stage('Use env but they are news') {
           environment {
                LOGIN = "login"
                COULEUR = "red"
                LOISIR = "telegaming"
            }
            steps {
                echo "Login is ${LOGIN}"
                echo "Color is now ${COULEUR}"
                echo "Loisir is ${LOISIR}"
            }
        }
        
        
        stage('git checkout') {
            steps {
                git branch: 'main' , 
                url: 'https://github.com/Sunland1/react-pokedex.git'
            }
        }
        
        stage('Install deps'){
            steps {
                sh 'npm install'
                sh 'npm install -g create-react-app'
            }
        }
        
        
        stage('Run test'){
            steps {
                sh 'npm run test'
            }
        }
        
        stage('Build app'){
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Build the docker image'){
            steps{
                sh "docker build -f 'Dockerfile' -t sunland/reactpokedex:latest '.'"
                withCredentials([string(credentialsId: '00873a2b-7445-4353-9070-32e6b446e918', variable: 'dockerPassSunland')]) {
                    sh 'docker login -u sunland -p $dockerPassSunland'
                }
                sh 'docker push sunland/reactpokedex:latest'
            }
        } 
    }
    post {
            failure {
                emailext body: 'Ce build $BUILD_NUMBER a échoué',
                recipientProviders: [requestor()],
                subject: 'build',
                to: 'alexandre.horville@efrei.net'

            }
        }
}
