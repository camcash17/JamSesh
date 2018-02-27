# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180226114324) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.integer  "artistId"
    t.string   "onTour"
    t.string   "uri"
    t.integer  "userId"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "email",           limit: 255
    t.boolean  "admin",                       default: false
    t.string   "password_digest", limit: 255
    t.string   "remember_digest", limit: 255
    t.string   "access_token",    limit: 255
    t.string   "reset_digest",    limit: 255
    t.datetime "reset_sent_at"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.index ["access_token"], name: "index_users_on_access_token", using: :btree
    t.index ["email"], name: "index_users_on_email", using: :btree
  end

end
