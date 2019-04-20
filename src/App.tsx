import 'antd/dist/antd.css';
import './App.scss';

import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import { Route, Router } from 'react-router-dom';

import Header from './components/Header';
import SiteSider from './components/SiteSider';
import history from './history';
import Pages from './pageSwitch';

const { Content } = Layout

const pages = Pages.map((p) => (
    <Route 
        exact={true}
        key={p.path}
        path={p.path}
        component={p.component}
    />
))

const LocalApp = () => (
    <Router history={history}>
        <Layout className={document.location.pathname === '/login' ? 'login-container' : ''}>
            <SiteSider />
            <Content
                style={{ height: '100vh' }}
            >
                <Header />
                <div className="container">
                    {pages}
                </div>
            </Content>
        </Layout>
    </Router>
)
class App extends React.Component<any, any> {
  public render() {
    return (
        <LocaleProvider locale={zhCN}>
            <LocalApp/>
        </LocaleProvider>
    );
  }
}

export default App;
