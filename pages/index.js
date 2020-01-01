import React from 'react';
import { connect } from "react-redux";

import { Layout, Select, Row, Col } from 'antd'

import { getGold, getGit } from '../store/index'
import "./index.css";

const { Header } = Layout;
const { Option } = Select;

const catlist = [
  { code: "frontend", display: "前端" },
  { code: "backend", display: "后端" },
  { code: "android", display: "安卓" },
];

const langlist = [
  { code: "javascript", display: "Javascript" },
  { code: "css", display: "CSS" },
  { code: "html", display: "HTML" },
];

class Index extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    await reduxStore.dispatch(getGold({ isServer }));
    await reduxStore.dispatch(getGit({ isServer }));
    return {};
  }

  render() {
    let goldOptions = catlist.map(item => <Option key={item.code}>{item.display}</Option>);
    return (
      <div>
        <link rel="stylesheet" href="https://e-gold-cdn.xitu.io/static/ionicons/2.0.1/css/ionicons.min.css"></link>
        <Layout>
          <Header className="navbar">
            <div className="logo"></div>
          </Header>
          <div className="mainbox">
            <Row className="list-option">
              <Col span={6}>
                <div className="gold-navbar">
                  <Select defaultValue={this.props.category} onChange={(e) => this.props.getGold({ value: e })}>
                    {goldOptions}
                  </Select>
                </div>
              </Col>
              <Col span={18}>
                <div className="source-navbar">
                  <div className="source-box">
                    <div className="source-selector multiple">
                      <div className="curr">
                        <img className="icon source-icon" src="https://e-gold-cdn.xitu.io/static/github.png" />
                        <div className="title" style={{ color: "rgb(0, 0, 0)" }}>GitHub</div>
                        <div className="arrow"></div>
                      </div>
                    </div>
                    <div className="lang-selector active">
                      <Select defaultValue={this.props.lang} onChange={(e) => this.props.getGit({ value: e })}>
                        {langlist.map(item => <Option key={item.code} value={item.code}>{item.display}</Option>)}
                      </Select>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {
                  this.props.goldlist.map(item =>
                    <div key={item.id} className="item">
                      <a className="item-content" href={item.url} target="_blank">
                        <div className="badge">
                          <div className="icon ion-arrow-up-b"></div>
                          <div className="text">{item.collectionCount}</div>
                        </div>
                        <div className="entry-info">
                          <div className="title">{item.title}</div>
                          <div className="meta">
                            <div className="list">
                              <div className="meta-item">
                                <span className="text">{item.user.username}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                }
              </Col>
              <Col span={18}>
                <div className="entry-list">
                  <ul className="list filled" style={{ transform: "translate(0px, 0px) translateZ(0px)" }}>
                    {
                      this.props.gitlist.map(item => {
                        return <li key={item.id} className="item-row">
                          <div className="item-box">
                            <div className="item-git">
                              <div className="repo-content">
                                <div className="repo-header">
                                  <h2 className="title">
                                    <a className="title-text" href={item.url} target="_blank">
                                      <span className="author">{item.username}</span>
                                      <span className="divider"> / </span>
                                      <span className="name">{item.reponame}</span>
                                    </a>
                                  </h2>
                                </div>
                                <div className="repo-desc">
                                  <div className="desc" title={item.description}>{item.description}</div>
                                </div>
                                <div className="repo-meta">
                                  <span className="star"><i className="icon ion-android-star"></i>{item.starCount}</span>
                                  <span className="fork"><i className="icon ion-fork-repo"></i>{item.forkCount}</span>
                                  <span className="lang"><i className="icon lang-color" style={{ backgroundColor: item.langColor }}></i>
                                    <span>{item.lang}</span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      })
                    }
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Layout>
      </div>
    )
  }
}

export default connect(state => state, { getGold, getGit })(Index);