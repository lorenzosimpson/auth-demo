import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faChartLine, faGavel, faLaptopCode, faColumns, faUserFriends, faEnvelope, faUserLock, faLock } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faChartLine);
  library.add(faGavel);
  library.add(faLaptopCode);
  library.add(faColumns);
  library.add(faUserFriends);
  library.add(faEnvelope);
  library.add(faLock);
}

export default initFontAwesome;
