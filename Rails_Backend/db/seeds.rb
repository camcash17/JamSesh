# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Artist.create([
{
   name: "O.A.R.",
   artistId: 168886,
   onTour: "2018-09-18",
   uri: "http://www.songkick.com/artists/168886-oar?utm_source=47417&utm_medium=partner",
   userId: 1
 },
 {
    name: "Nas",
    artistId: 38697,
    onTour: "2018-05-18",
    uri: "http://www.songkick.com/artists/38697-nas?utm_source=47417&utm_medium=partner",
    userId: 2
  }
])

puts "#{Artist.count} artist just now!"
