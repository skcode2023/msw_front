import { HashRouter, Routes, Route } from "react-router-dom";
import Box from "./Box";
import Home from "./Home";
import Main from "./Main";
import Market from "./Market";
import Personal from "./Personal";
import Store from "./Store";
import Stake from "./Stake";
import WhitePaper from "./WhitePaper";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="box" element={<Box />} />
          <Route path="market" element={<Market />} />
          
          <Route path="stake" element={<Stake />} />
          <Route path="personal" element={<Personal />} />
          <Route path="whitePaper" element={<WhitePaper />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
