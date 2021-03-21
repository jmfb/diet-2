import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '~/reducers/rootReducer';
import ChunkLoading from '~/components/ChunkLoading';
import Loadable from 'react-loadable';
import './index.scss';

const asyncLoginContainer = Loadable({
	loader: () => import(/* webpackChunkName: 'LoginContainer' */ '~/containers/LoginContainer'),
	loading: ChunkLoading
});

const asyncAuthenticateContainer = Loadable({
	loader: () => import(/* webpackChunkName: 'AuthenticateContainer' */ '~/containers/AuthenticateContainer'),
	loading: ChunkLoading
});

const asyncErrorContainer = Loadable({
	loader: () => import(/* webpackChunkName: 'ErrorContainer' */ '~/containers/ErrorContainer'),
	loading: ChunkLoading
});

const asyncApplicationContainer = Loadable({
	loader: () => import(/* webpackChunkName: 'ApplicationContainer' */ '~/containers/ApplicationContainer'),
	loading: ChunkLoading
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);

ReactDOM.render(
	<Provider {...{store}}>
		<BrowserRouter>
			<Switch>
				<Route path='/login' component={asyncLoginContainer} />
				<Route path='/authenticate' component={asyncAuthenticateContainer} />
				<Route path='/error' component={asyncErrorContainer} />
				<Route path='/' component={asyncApplicationContainer} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
