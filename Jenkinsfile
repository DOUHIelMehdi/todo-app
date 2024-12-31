pipeline {
    agent any

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
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
