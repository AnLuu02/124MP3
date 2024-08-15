//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//            Phật phù hộ, không bao giờ BUG
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { checkAuthState } from './components/store/userReducer.js';
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.jsx";
import Artist from './pages/Artist/Artist.jsx';
import BXH from './pages/BXH/BXH';
import Discover from "./pages/Discover/Discover";
import SongDiscover from './pages/Discover/component/SongDiscover/SongDiscover.jsx';
import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import AlbumLibrary from './pages/Library/components/AlbumLibrary/AlbumLibrary.jsx';
import MvLibrary from './pages/Library/components/MvLibrary/MvLibrary.jsx';
import SongLibrary from './pages/Library/components/SongLibrary/SongLibrary.jsx';
import HeardRecently from './pages/Library/pages/HeardRecently/HeardRecently.jsx';
import Playlist from './pages/Library/pages/Playlist/Playlist.jsx';
import NewRelease from './pages/New-release/NewRelease.jsx';
import AlbumNewRelease from './pages/New-release/SubNewRelease/Album/AlbumNewRelease.jsx';
import SongNewRelease from './pages/New-release/SubNewRelease/Song/SongNewRelease.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import SearchResult from './pages/SearchResult/SearchResult.jsx';
import Top from "./pages/Top100/Top100";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <>
        <Routes>

          <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>}>
            <Route path="/home" element={<DefaultLayout><Home /></DefaultLayout>}>
            </Route>
          </Route>


          <Route path="/discover" element={<DefaultLayout>< Discover /></DefaultLayout>}>
            <Route path="" element={<SongDiscover />}></Route>
            <Route path="/discover/:filter" element={<SongDiscover />}></Route>
          </Route>


          <Route path="/library" element={<PrivateRoute><DefaultLayout><Library /></DefaultLayout></PrivateRoute>}>
            <Route path="/library/" element={<SongLibrary />}>
              <Route path="/library/song" element={<SongLibrary />}>
                <Route path="/library/song/:filter" element={<SongLibrary />}></Route>
              </Route>
            </Route>


            <Route path="/library/album" element={<AlbumLibrary />}> </Route>


            <Route path="/library/mv" element={<MvLibrary />}> </Route>


            <Route path="/library/history" element={<HeardRecently />}>
              <Route path="/library/history/:filter" element={<HeardRecently />}>
              </Route>
            </Route>


            <Route path="/library/playlist" element={<Playlist />}>
              <Route path="/library/playlist/:filter" element={<Playlist />}></Route>
            </Route>


          </Route>



          <Route path="/bxh" element={<DefaultLayout><BXH /></DefaultLayout>}></Route>

          <Route path="/chude" element={<DefaultLayout><Artist /></DefaultLayout>}></Route>


          <Route path="/top100" element={<DefaultLayout><Top /></DefaultLayout>}></Route>



          <Route path="/new-release" element={<DefaultLayout><NewRelease /></DefaultLayout>}>
            <Route path="/new-release/" element={<SongNewRelease />}>
              <Route path="/new-release/song" element={<SongNewRelease />}>
                <Route path="/new-release/song/:filter" element={<SongNewRelease />}></Route>
              </Route>
            </Route>

            <Route path="/new-release/album" element={<AlbumNewRelease />}>
              <Route path="/new-release/album/:filter" element={<AlbumNewRelease />}></Route>
            </Route>
          </Route>



          <Route path="/tim-kiem/:filter" element={<DefaultLayout>< SearchResult /></DefaultLayout>}></Route>
          {/*page not found*/}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    </BrowserRouter >
  )
}

export default App
