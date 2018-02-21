# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Artist.create([
{
   name: "O.A.R.",
   artistId: 168886,
   onTour: "2018-09-18"
 }
])

puts "#{Artist.count} artist just now!"
