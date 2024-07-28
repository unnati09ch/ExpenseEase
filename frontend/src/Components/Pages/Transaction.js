import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from '../../img/bg.png'
import {MainLayout} from '../../styles/Layouts'
import Orb from '../Orb/Orb'
import Navigation from '../Navigation/Navigation'
import Dashboard from '../Dashboard/Dashboard';
import Income from '../Income/Income'
import Expenses from '../Expenses/Expenses';
import { useGlobalContext } from '../../context/globalContext';

function Transaction() {
  const [active, setActive] = useState(1)
  // console.log("Trans recieved")

  const global = useGlobalContext()
  // console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      // case 2:
      //   return <Dashboard />
      case 2:
        return <Income />
      case 3: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <TransactionStyled bg={bg} className="Transaction">
      {orbMemo}
      <MainLayout>

        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </TransactionStyled>
  );
}

const TransactionStyled = styled.div`
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

export default Transaction;
