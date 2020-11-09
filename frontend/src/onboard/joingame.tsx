import React, { Fragment,memo,useCallback } from "react";
import { useParams } from "react-router-dom";
const socket = require("../connection/socket").socket;

/**
  * Extract the gameId from the URL.
  * the gameId is the gameRoom ID.
  */
const JoinGame = memo((props: { userName: any; isCreator: any }) => {
  const { gameid } = useParams<{ gameid }>();

/**
 * Join game is where we actually join the game room.
 * For the current browser instance, we want
 * to join it to a gameRoom.
 */
const JoinGameRoom = useCallback((gameid: any, userName: any, isCreator: any) => {
  const idData = {
    gameId: gameid,
    userName: userName,
    isCreator: isCreator,
  };
  socket.emit("playerJoinGame", idData);
},[]);

  return (
    <Fragment>
      {JoinGameRoom(gameid, props.userName, props.isCreator)}
      <br></br>
      <div className="ui-chess24Logo svg">
        <svg
          viewBox="0 0 128 30"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M41.0454 25.2285C38.7218 25.2285 36.8842 24.524 35.5806 23.1337C34.2812 21.7476 33.6221 19.7467 33.6221 17.1892C33.6221 14.7088 34.3146 12.7536 35.6787 11.3759C37.0449 9.99813 38.8637 9.29987 41.085 9.29987C42.8579 9.29987 44.3806 9.68756 45.6091 10.4546L45.7426 10.538L44.779 13.4394L44.5725 13.331C43.3773 12.7078 42.2552 12.391 41.2352 12.391C40.0859 12.391 39.2078 12.787 38.5508 13.6041C37.8917 14.4211 37.558 15.6426 37.558 17.2308C37.558 18.84 37.8875 20.0739 38.5383 20.9014C39.187 21.7247 40.0818 22.127 41.2769 22.127C42.5346 22.127 43.7611 21.7497 44.925 21.0077L45.1899 20.8389L45.582 23.9675L45.4798 24.0363C44.8415 24.4615 44.1699 24.772 43.4837 24.9576C42.8016 25.1347 41.9819 25.2285 41.0454 25.2285Z" />
          <path d="M60.7607 24.943H56.8144V15.7114C56.8144 14.54 56.6287 13.675 56.2658 13.1414C55.9133 12.6244 55.3189 12.3743 54.4512 12.3743C53.7003 12.3743 53.0245 12.5661 52.4446 12.9454C51.869 13.3206 51.4309 13.8104 51.141 14.3982C50.9324 15.207 50.8282 16.2762 50.8282 17.579V24.9409H46.8818V4.19113L50.8282 3.93475V8.43905C50.8282 8.64749 50.8136 9.23111 50.7864 10.1712C50.776 10.5484 50.7677 10.8527 50.7614 11.0799C51.9378 9.89602 53.4688 9.29572 55.3189 9.29572C57.0292 9.29572 58.3787 9.79805 59.3319 10.786C60.281 11.7719 60.7628 13.2977 60.7628 15.3174V24.943H60.7607Z" />
          <path d="M66.1069 15.5946H72.1953C72.1661 14.5336 71.9054 13.7061 71.4173 13.1309C70.9001 12.5222 70.2013 12.2263 69.2773 12.2263C68.4117 12.2263 67.7026 12.5181 67.1081 13.1163C66.5533 13.6749 66.2175 14.5086 66.1069 15.5946ZM69.8342 25.2285C67.3959 25.2285 65.4666 24.5135 64.1004 23.1024C62.7363 21.6934 62.0459 19.7279 62.0459 17.2558C62.0459 14.8505 62.6967 12.9058 63.9794 11.4759C65.2684 10.0398 67.0455 9.30607 69.2627 9.29773C71.3631 9.29773 73.0213 9.96681 74.1894 11.2883C75.3511 12.6014 75.9393 14.3648 75.9393 16.5263C75.9393 16.6805 75.9373 16.9306 75.9331 17.2746C75.9289 17.6164 75.9268 17.8686 75.9268 18.0312V18.2292H66.0277C66.0923 19.4652 66.4573 20.4386 67.1102 21.1244C67.7943 21.8435 68.7559 22.2062 69.9677 22.2062C71.5529 22.2062 73.0964 21.7872 74.5585 20.9597L74.7963 20.8242L75.3783 23.7465L75.2615 23.8194C73.7493 24.7532 71.9221 25.2285 69.8342 25.2285Z" />
          <path d="M82.2757 25.2139C80.0564 25.2139 78.248 24.8262 76.9068 24.0634L76.79 23.9967L77.2135 20.9118L77.4658 21.0494C78.0478 21.3662 78.7987 21.6538 79.7018 21.9061C80.6008 22.1583 81.4309 22.2854 82.1693 22.2854C82.9118 22.2854 83.4917 22.1478 83.8963 21.879C84.2801 21.6226 84.472 21.2516 84.4783 20.7472C84.4783 20.299 84.3031 19.953 83.9422 19.6925C83.548 19.4069 82.7721 19.0421 81.6374 18.6065C81.2411 18.4627 80.9825 18.3668 80.8636 18.321C79.4682 17.779 78.4441 17.1641 77.8204 16.4909C77.1822 15.801 76.8589 14.8609 76.8589 13.6958C76.8589 12.2805 77.3803 11.18 78.4107 10.4212C79.4223 9.67713 80.8406 9.29987 82.6282 9.29987C84.5471 9.29987 86.2595 9.66671 87.7175 10.39L87.876 10.4692L86.8623 13.2914L86.6663 13.1997C85.2813 12.5556 83.9464 12.2284 82.697 12.2284C82.0233 12.2284 81.4935 12.3389 81.1243 12.5598C80.7843 12.762 80.6175 13.0642 80.6175 13.479C80.6175 13.8729 80.7781 14.171 81.1118 14.3899C81.4852 14.6379 82.2381 14.9693 83.3478 15.3779C83.3582 15.3799 83.427 15.4008 83.6982 15.4987C83.9005 15.5717 84.0569 15.6321 84.1675 15.678C85.5483 16.1803 86.5849 16.7973 87.2461 17.5081C87.9198 18.2334 88.2619 19.1881 88.2619 20.3449C88.2515 21.8915 87.7175 23.1046 86.6704 23.9529C85.6359 24.7887 84.157 25.2139 82.2757 25.2139Z" />
          <path d="M94.5151 25.2139C92.2958 25.2139 90.4874 24.8262 89.1442 24.0634L89.0273 23.9967L89.4508 20.9118L89.7031 21.0494C90.2851 21.3662 91.036 21.6538 91.9391 21.9061C92.8381 22.1583 93.6682 22.2854 94.4066 22.2854C95.1491 22.2854 95.729 22.1478 96.1315 21.879C96.5153 21.6226 96.7072 21.2516 96.7135 20.7472C96.7135 20.299 96.5383 19.953 96.1795 19.6925C95.7853 19.4069 95.0094 19.0421 93.8747 18.6065C93.4784 18.4627 93.2198 18.3668 93.1009 18.321C91.7055 17.779 90.6814 17.1641 90.0577 16.4909C89.4195 15.801 89.0983 14.8609 89.0983 13.6958C89.0983 12.2805 89.6197 11.18 90.648 10.4212C91.6596 9.67713 93.078 9.29987 94.8655 9.29987C96.7844 9.29987 98.4968 9.66671 99.9548 10.39L100.113 10.4692L99.0996 13.2914L98.9036 13.1997C97.5165 12.5556 96.1816 12.2284 94.9343 12.2284C94.2606 12.2284 93.7308 12.3389 93.3616 12.5598C93.0216 12.762 92.8548 13.0642 92.8548 13.479C92.8548 13.8729 93.0175 14.171 93.3491 14.3899C93.7225 14.6379 94.4754 14.9693 95.5851 15.3779C95.5955 15.3799 95.6643 15.4008 95.9355 15.4987C96.1378 15.5717 96.2942 15.6321 96.4048 15.678C97.7856 16.1803 98.8222 16.7973 99.4834 17.5081C100.157 18.2334 100.499 19.1881 100.499 20.3449C100.489 21.8915 99.9548 23.1046 98.9077 23.9529C97.8753 24.7887 96.3964 25.2139 94.5151 25.2139Z" />
          <path d="M112.972 24.9742H102.222L102.14 22.0874L107.803 15.6821C108.485 14.9526 108.986 14.2773 109.297 13.6707C109.601 13.0767 109.753 12.441 109.753 11.7802C109.753 11.0653 109.528 10.5129 109.067 10.0919C108.606 9.67294 107.987 9.45825 107.225 9.45825C106.502 9.45825 105.778 9.59373 105.073 9.86261C104.368 10.1315 103.784 10.4712 103.335 10.8735L103.121 11.0674L102.061 8.27016L102.165 8.17845C103.408 7.08416 105.173 6.52972 107.411 6.52972C109.194 6.52972 110.654 6.9862 111.75 7.88873C112.855 8.79959 113.416 10.1002 113.416 11.7531C113.416 12.9141 113.103 14.0355 112.486 15.0881C111.879 16.1219 111.04 17.1975 109.991 18.2876L106.308 22.1916H113.228L112.972 24.9742Z" />
          <path d="M117.88 18.2542H122.195V10.9423L117.88 18.2542ZM125.804 24.9742H122.195V21.0368H114.184V18.6252L121.459 6.91528H125.804V18.2396H128L127.816 21.0347H125.804V24.9742Z" />
          <path d="M24.0967 11.9616C24.0967 12.1805 23.9194 12.3597 23.7045 12.3597H18.2106C18.1897 12.3597 18.1689 12.3576 18.1501 12.3535V17.852C18.1501 18.0709 17.9728 18.2501 17.758 18.2501H12.264C12.2431 18.2501 12.2223 18.2459 12.2035 18.2439V23.7424C12.2035 23.9612 12.0262 24.1405 11.8114 24.1405H6.31741C6.10257 24.1405 5.92528 23.9612 5.92528 23.7424V18.1626C5.92528 17.9437 6.10257 17.7645 6.31741 17.7645H11.8114C11.8322 17.7645 11.8531 17.7665 11.8719 17.7707V12.2722C11.8719 12.0533 12.0492 11.8741 12.264 11.8741H17.758C17.7788 11.8741 17.7997 11.8761 17.8184 11.8803V6.38178C17.8184 6.16292 17.9957 5.98367 18.2106 5.98367H23.7045C23.9194 5.98367 24.0967 6.16292 24.0967 6.38178V11.9616ZM29.624 3.78884C29.3925 2.01297 28.3705 1.01039 26.5829 0.62687C22.5824 -0.231885 7.28939 -0.163101 3.43485 0.558087C1.64107 0.893668 0.627377 1.9421 0.395854 3.71797C-0.146451 7.89085 -0.11725 22.7398 0.395854 26.3332C0.685779 28.3613 1.67444 29.1992 3.43693 29.4952C7.1559 30.1205 22.4823 30.1893 26.585 29.564C28.3496 29.2951 29.3362 28.4301 29.6261 26.402C30.1371 22.8107 30.1684 7.95964 29.624 3.78884Z" />
        </svg>
      </div>
    </Fragment>
  );
});

export default JoinGame;
