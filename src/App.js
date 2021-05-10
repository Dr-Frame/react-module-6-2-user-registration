import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
/* import TodosView from './views/TodosView';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView'; */
import Container from './components/Container';
import { authOperations } from './redux/auth';
import { connect } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const TodosView = lazy(() => import('./views/TodosView'));

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  //  дети рендерятся первые, родитель в конце
  //чем глубже компомент\. тем первее рендерит.
  //запрос на отрисовку тудух идет раньше рефреша юзера!!!
  //компонент дид майнт на рефреш идет последний!
  render() {
    return (
      <Container>
        <AppBar />

        <Suspense fallback={<p>Загружаем...</p>}>
          <Switch>
            <PublicRoute exact path="/" component={HomeView} />
            <PublicRoute
              path="/register"
              restricted
              component={RegisterView}
              redirectTo="/"
            />
            <PublicRoute
              path="/login"
              restricted
              component={LoginView}
              redirectTo="/"
            />
            <PrivateRoute
              path="/todos"
              component={TodosView}
              redirectTo="/login"
            />
          </Switch>
        </Suspense>
      </Container>
    );
  }
}
const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
