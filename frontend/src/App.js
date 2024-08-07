
import styled from "styled-components";
import bg from './img/bg.png'
import {Route,Routes} from "react-router-dom";
import Home from "./Components/Pages/Home";
import Transaction from "./Components/Pages/Transaction";

function App() {
  

  return (
    <AppStyled bg={bg} className="App">
      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />

          </Routes>
          
     
      
    
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
