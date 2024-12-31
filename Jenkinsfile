pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo-app-image' // Docker image name
        DOCKER_TAG = 'latest'          // Docker tag
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/DOUHIelMehdi/todo-app.git'
            }
        }

        stage('Install Node.js') {
            steps {
                echo 'Installing Node.js and npm...'
                sh 'curl -fsSL https://deb.nodesource.com/setup_16.x | bash -'
                sh 'apt-get install -y nodejs'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh './deploy.sh'
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete.'
        }
    }
}
