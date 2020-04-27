import React,{ Fragment, Component } from 'react';

export default class Demo extends Component{
  constructor(props){
    super(props);
    this.state={
      inViewPort: false,
    }
  }

  componentDidMount() {
    const io = new IntersectionObserver((entries )=>{
      console.log(entries);
      if(entries && entries[0]){
        this.setState({
          inViewPort: entries[0].isIntersecting,
        })
      }
    }, {
      threshold: [1],
    });
    io.observe(this.ele);

  }


  render() {
    const { inViewPort } = this.state;
    const style = {
      height: '100px',
      paddingBottom: '20px',
      background: 'orange'
    }
    return (
      <Fragment>
        <h1 style={{position: 'absolute', top: '20px'}}>
          {inViewPort ? '在视窗内' : '在视窗外' }
        </h1>
        <div>
          <ul>
            <li style={style}>
              123
            </li>
            <li style={style}>
              123
            </li>
            <li style={style}>
              123
            </li>
            <li style={style}>
              123
            </li>
            <li style={style}>
              123
            </li>
            <li style={{height: '200px'}}>
              123
            </li>
            <li style={{height: '200px'}}>
              123
            </li>
          </ul>
        </div>
      <div ref={(div)=>{this.ele = div}}>
        div
      </div>
      </Fragment>
    );
  }
}
