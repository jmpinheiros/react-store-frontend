# GIT
-   repositório git local criado e com branc master em vez de main
# mude o nome da branch
	git branch -m main
# adicione o repositório local ao remoto passando endereço do projeto criado no gitlab
	git remote add origin <endereço-do-repositório-GitLab>
# envie o primeiro push para main
	git push -u origin main

## Subindo a App

    docker-compose up --build -d

- Em prod use o docker/nginx/dockerfile_prd
- Em dev use docker/react/dockefile

- Em prd Faz o build da app e sobe um nginx com as configurações necessárias, acesse em localhost:80

- Em dev ele sobe o react, acesse em localhost:3000


## FRONTEND ##

## Depois que app estiver no ar, vamos criar o react
    npx create-react-app frontend
    npm start
    npm install react-bootstrap bootstrap
    npm install --save react-router-dom

# instalar bootstrap no projeto
    usar estilo bootstrap no aquivo index.html

# Criar componentes em src/

# criar um componente especifico para navegação
    import { NavLink } from 'react-router-dom';
    import { Navbar, Nav } from 'react-bootstrap';

# Usar Router para navegar entre paginas 
          <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='department/*' element={<Department/>} />
        <Route path='employee/*' element={<Employee/>} />
      </Routes>


# Crie um arquivo .env no src/ para add url da api
    REACT_APP_API = http://127.0.0.1:8000/
    REACT_APP_PHOTOPATH = http://127.0.0.1:8000/media/

# Problemas ao puxar as variaveis de ambiente do arquivo .env


# Problemas de loop infinito na requisição à api




# ------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
