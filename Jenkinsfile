pipeline {
    agent any
    tools {
        nodejs "node 18"
    }
    stages {
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
}