pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo-app-image' // Docker image name
        DOCKER_TAG = 'latest'          // Docker tag
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Use the repository URL without credentials since it's public
                git branch: 'main', url: 'https://github.com/your-repo/todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'  // Adjust if the project uses a different build system
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Adjust if your project uses another testing system
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
                sh './deploy.sh'  // Replace with your deployment script
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete.'
        }
    }
}
