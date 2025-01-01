pipeline {
    agent any

    environment {
        DOCKER_HUB = credentials('dockerhub') 
        IMAGE_TAG  = 'douhielmehdi/todo-app'      
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'master', url: 'https://github.com/DOUHIelMehdi/todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'

                // Install project dependencies
                sh 'npm install'

                // Build the project
                sh 'npm run build'

                echo 'Build completed successfully!'
            }
        }

        stage('Build-Docker-Image') {
            steps {
                echo 'Building Docker Image for React Frontend...'

                // Build Docker image for the React frontend
                sh 'docker build -t $IMAGE_TAG:$BUILD_NUMBER .'

                echo 'Docker Image Built Successfully.'
            }
        }

        stage('Push-Docker-Image') {
            steps {
                echo 'Pushing Docker Image to DockerHub...'

                // Push Docker image to DockerHub
                sh 'docker push $IMAGE_TAG:$BUILD_NUMBER'

                echo 'Docker Image Pushed Successfully.'
            }
        }

        stage('Scan-Docker-Image') {
            steps {
                script {
                    // Install Docker Scout (if not already installed)
                    sh '''
                    if ! command -v docker-scout &> /dev/null; then
                        echo "Installing Docker Scout..."
                        curl -sSfL https://raw.githubusercontent.com/docker/scout-cli/main/install.sh | sh -s -- -b /usr/local/bin
                    fi
                    '''

                    // Login to DockerHub
                    sh '''
                    echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin
                    '''

                    // Scan Docker image for vulnerabilities
                    echo 'Scanning Docker image for vulnerabilities...'
                    sh '''
                    docker-scout cves $IMAGE_TAG:$BUILD_NUMBER
                    '''
                    echo 'Scanning complete.'
                }
            }
        }


        
    }
    

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }

}