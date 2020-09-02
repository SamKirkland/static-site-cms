/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import { useSiteSettingsForm } from './UseGlobalForm';
import { BrowserRouter as Router } from "react-router-dom";
import { MainNav } from './MainNav';
import { CurrentPage } from './CurrentPage';
import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

async function loadData() {
  console.warn("ToDo: Implement data loading");
  
  const apiResponse = await fetch('/data/site.json');
  const apiData = apiResponse.json();
  
  return apiData;
}

interface IAppProps {}
interface IAppState {
  data?: any;
}

class App extends React.Component<IAppProps, IAppState> {
  componentDidMount = async () => {
    this.setState({
      data: await loadData()
    });
  }

  render() {
    if (this.state === null || this.state.data === undefined) {
      return <div>Loading...</div>
    }

    return <FormThing data={this.state.data} />
  }
}

interface IFormThingProps {
  data: any;
}

function FormThing(props: IFormThingProps) {
  const [siteData] = useSiteSettingsForm(props.data, {
    id: "site",
    label: "Company Settings"
  });

  const today = new Date();

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <Row>
            <Col style={{ color: "#fff", marginRight: 16 }}>
              <img src={siteData.site.logo} height={50} alt={siteData.site.companyName} />
              {siteData.site.companyName}
            </Col>
            <Col>
              <MainNav siteData={siteData} />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Content style={{ padding: '0 24px', minHeight: 280, backgroundColor: "#fff", borderRadius: 4 }}>
              <CurrentPage siteData={siteData} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{today.getFullYear()} - built with <a href="http://github.com/samKirkland/static-site-cms" target="_blank" rel="noopener noreferrer">Static Site CMS</a>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
