import React from "react";
import styled from "styled-components";
import { Player } from "video-react";
import Popup from "reactjs-popup";
import TeamHeader from "../team-header/TeamHeader";
import Footer from "../footer/footer";
import mapHomm from "../../assets/images/project/maphom3.png";
import manyLink from "../../assets/images/project/photos.png";
import weightImg from "../../assets/images/project/fileweight.jpg";
import mapCode from "../../assets/images/project/mapCode.png";
import player from "../../assets/images/project/player.png";
import moveCode from "../../assets/images/project/moveCode.png";
import moveCodeTwo from "../../assets/images/project/moveCode2.png";
import codeThree from "../../assets/images/project/codeThree.png";
import hourseVideo from "../../assets/images/project/videoHourse.mp4";
import animation from "../../assets/images/project/animations.png";
import frames from "../../assets/images/project/frames.png";
import state from "../../assets/images/project/state.png";
import mapFull from '../../assets/images/mapSmall.png'
import  {
  title,
  p1,
  p2,
  p3,
} from '../../assets/text/project'
const ProjectBlock = styled.div`
  width: 100%;
  margin-top: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
  }
`;
const Text = styled.div`
  width: 80%;
  margin: 0 auto;
  height: auto;
`;
const Project = () => {
  return (
    <div>
      <TeamHeader />
      <ProjectBlock>
        <Text>
          <h1>{title}</h1>
          <p>
          {p1}
          </p>
          <p>
            Нам сразу же предоставили крутейшего ментора{" "}
            <a href="">Дмитрия Райчева</a>, который готов в любое время
            почикать вопросики по поводу проекта с нами. При первом созвоне с
            ментором, мы сразу обсудили структуру проекта и из чего он будет
            состоять. Ментор собрал нам вебпак проект, а мы отсекли тяжелые фичи для реализации
            <strike>
              (через месяц разработки они были не такие уж и тяжелые)
            </strike>
            и, полные мотивации и интереса, мы начали творить свой проект с
            нулевым пониманием движка Phaser 3...
          </p>
          <h2>Карта</h2>
          <p>
            Первая сложность возникла, как только мы приступили. Пришлось с нуля
            изучать незнакомый для тебя ранее движок Phaser 3. Встал ребром
            вопрос аля "Как замутить коня, который бегает по карте" через
            страшные для новичка в этом деле
            <strong>"preload, create, update"</strong>. Пошустрив интернетик в
            поиске ответа на вопрос "Как парсить карту homm3 из форматаh3m в
            json", было круто, когда на одном из форумов нашли похожий вопрос.
            Мы обрадовались, какой то парень написал, что он пишет Герои 3 в
            браузере на файзере и задал вопрос про парсинг карты. Мы уже
            подумали, что есть готовый код и работа будет значительно легче.
            Однако, парень это написал два года назад и ему никто не ответил. А
            еще глянули, что он оставил только один пост и все, похоже
            забросил... (понимаю почему).
          </p>
          <p>
           {p2}
          </p>
          <img src={mapHomm} alt="map" width="100%" height="auto" />
          <p>
          {p3}
          </p>
          <Popup
            trigger={<img src={manyLink} alt="map" width="50%" height="auto" />}
            modal
            closeOnDocumentClick
          >
            <img src={manyLink} alt="map" width="70%" height="auto" />
          </Popup>
          <p>
            Нужно было делать очень и очень много скринов, т.к редактор не может мне
            выдать полностью картинку, а позже эти картинки склеивать в фотошопе по 12 штук
          </p>
          <img src={weightImg} alt="map" width="100%" height="auto" />
          <p>
            По итогу появился такой монстр и пригрозил убить мой кампуктер, если я его не уменьшу.
             Потом заливаешь это в Tiled, где по
            квадратикам, типа мозайки, собираешь всю карту. Самих тайлов
            (квадратиков) получается больше нескольких тысяч. Аккуратненько переводишь квадратики на новый образ.
            На выходе мы получаем файл с форматом JSON и пикчу PNG, с которыми пришлось еще пару часиков поиграться, что бы понять как поставить на движок.
          </p>
          <Popup
            trigger={<img src={mapCode} alt="map" width="30%" height="auto" />}
            modal
            closeOnDocumentClick
          >
            <img src={mapCode} alt="map" width="auto" height="auto" />
          </Popup>
          <p>
            8 строчек кода стоили 4 дней отрисовки, продумавания и страдания.{" "}
            <strong>Collied</strong> означет, что персонаж не может ходить на те
            тайлы. Но, все же, карта была готова (хоть финальная и была шестым написанным вариантом)
          </p>
               <img src={mapFull} alt="map" width="100%" height="auto" />
          <h2>Конь бегает</h2>
          <p>
            Для начала нужно было создать спрайт главного героя и посадить его
            на карту. Сам спрайт коня пришлось брать в гугле, вырезать и
            залипать в программу "TexturePacker". Самое главное - это выбрать внешность персонажа, прическу, коня, как в симсах. По выходу мы получем опять
            Json формат, который порезан на frames и png. Дальше встает вопрос,
            а как ходить, если нашему ребеночку всего 3 недели?
          </p>

          <Popup
            trigger={<img src={moveCode} alt="map" width="30%" height="auto" />}
            modal
            closeOnDocumentClick
          >
            <img src={moveCode} alt="map" width="70%" height="auto" />
          </Popup>
          <p>
            Пришлось такими способами искать нужный градус поворта персонажа и в
            этот момент должна была отыгрывать определенная анимация. Сам ход
            просчитывал тайлы на карте(да, те самые квадратики, которых очень
            много) Дальше уже ловкость рук и работы с 30 фреймами.{" "}
          </p>

          <Popup
            trigger={
              <img src={codeThree} alt="map" width="30%" height="auto" />
            }
            modal
            closeOnDocumentClick
          >
            <img src={codeThree} alt="map" width="70%" height="auto" />
          </Popup>
          <p>Вот таким способом задавалось движение коня по полю</p>

          <Popup
            trigger={
              <img src={moveCodeTwo} alt="map" width="30%" height="auto" />
            }
            modal
            closeOnDocumentClick
          >
            <img src={moveCodeTwo} alt="map" width="70%" height="auto" />
          </Popup>
          <Player playsInline src={hourseVideo} />
          <p>
            И так, наш конь может ходить и видит карту. Супер, можно сдавать
            проект? Ага, почти. Теперь нужно реализовать bad boys и своих братков, а,
            если быть точнее, нарезать овермного спрайтов анимации хождения,
            анимации удара. Собралась внушительная папочка спрайтов.
          </p>
          <img src={animation} alt="map" width="100%" height="auto" />
          <p>
            Да, этой пикчей можно почувстовать боль того, кто вырезал все эти
            спрайты по одному в фотошоп, затем закидывал в текстур пакер,
            заливал в проект и прописывал фреймы в стейт и собственный json
            юнита
          </p>

          <Popup
            trigger={<img src={frames} alt="map" width="30%" height="auto" />}
            modal
            closeOnDocumentClick
          >
            <img src={frames} alt="map" width="70%" height="auto" />
          </Popup>
          <p>Точно, я же забыл. А что там по стейту? </p>
          <p>
            Вся игра состоит из нескольких конфигов, которые следят за тем, что
            ничего в игре не может бахнуть без их ведома. Делятся, по сути, на
            три главных. Стейт боя, где сохранены параметры, анимации "бей палкой по
            голове" твоих ребят и "не твоих берят". Стейт мира, где находятся координаты и
            параметры всего, что происходит на главной карте игры. Личный стейт
            игрока, который смотрит за уроном, ходами, парнями в инвентаре.
          </p>

          <Popup
            trigger={<img src={state} alt="map" width="30%" height="auto" />}
            modal
            closeOnDocumentClick
          >
            <img src={state} alt="map" width="70%" height="auto" />
          </Popup>
          <p>
            На самом то деле, в игре очень много разных фичей и проблем, которых
            они требовали. Синхронизация, переход между сценами, модалками.
            Работа с видео и аудио, все ассеты, проходили через твердую руку
            фотошопа. Реально пришлось одновременно с видосами по файзеру,
            смотреть видосики по фотошопу. В копилочке скиллов новый пункт. Да
            вообще сам сайт, на котором вы находитесь связан с игрой React
            Router и написан в связку сo styledComponents. Больше подробной
            информации вы можете найти отдельно в наших видео.{" "}
          </p>
          <p>
            {" "}
            Если остались какие то вопросы, которые не дают вам покоя, можете
            спокойно спрашивать. Ах да, надеюсь, концовка вам понравилась, мы
            вложили в нее душу...{" "}
          </p>
        </Text>
      </ProjectBlock>
    </div>
  );
};

export default Project;
