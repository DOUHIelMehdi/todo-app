pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Dockerize') {
            steps {
                script {
                    sh 'docker build -t todo-app .'
                    sh 'docker tag your-app-name your-dockerhub-username/your-app-name:latest'
                    sh 'docker push your-dockerhub-username/your-app-name:latest'
                }
            }
        }
    }
}
