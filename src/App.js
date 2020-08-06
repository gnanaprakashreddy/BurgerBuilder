import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Auxi/Auxi';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
   render() {
    return (
      <div>
          <Layout>
           <Aux>
              <BurgerBuilder/>
           </Aux>
          </Layout>
      </div>
    );
  }
}
export default App;
