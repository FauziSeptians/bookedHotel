### API CONTRACT

## Task
- Pencaria ketersediaan kamar
- Berita dan promo
- Formulir kontak
- Warna Tema
- Booking kamar
- login dan register

## LOGIN DAN REGISTER USER

Field database : 
- username
- email 
- password

Endpoint : 
create : POST /api/crete/users
login : POST /api/users
update : PATCH /api/update/users
delete : DELETE /api/delete/users

## Berita dan promo
Field database berita : 
- Image
- Title
- Tanggal
- description

Field database promo : 
- Images
- Title
- Promo
- Description
- Details : {
      FoodAndDrink 
      Conectivity
      General 
      PublicFacility
      RoomFacility
      RoomList
}
- Price
- policy

Endpoint Berita: 
create : POST /api/crete/new
views : Get /api/news

Endpoint Promo :
create : POST /api/crete/hotel
views : Get /api/hotel
update : Update /api/update/hotel

## Pencaria ketersediaan kamar & Fitur booked
Field database : 
- NoKamar
- Nama
- Email
- Startbooked
- EndBooked























