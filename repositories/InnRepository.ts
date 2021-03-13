export default class InnRepository {
  public static getInnDetailByOwner(owner_id: unknown): Promise<any> {
    const data = {
      id : 5,
      name : "Nhà trọ Minh Anh",
      owner_id : 3,
      water_price : 3500,
      electric_price : 3500,
      wifi_price: 100000,
      description : "lorem ipsum dolor sit amet consectetur adipiscing elit. aliquam tincidunt elementum sem non luctus",
      address :  "26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội",
      location : "48.19976  16.45572",
      status : 1,
      features: [1, 3, 5, 7, 9, 11, 13, 15],
      close_time: "22h30",
      open_time: "5h30",
      imgs: [
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
      ],
   }

    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, {data}), 1000)
    })
  }
}
