# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140625160813) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "decades", force: true do |t|
    t.integer  "years",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "genres", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "genres", ["name"], name: "index_genres_on_name", unique: true, using: :btree

  create_table "tv_decades", force: true do |t|
    t.integer  "decade_id",  null: false
    t.integer  "tv_show_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tv_decades", ["decade_id", "tv_show_id"], name: "index_tv_decades_on_decade_id_and_tv_show_id", unique: true, using: :btree

  create_table "tv_genres", force: true do |t|
    t.integer  "tv_show_id"
    t.integer  "genre_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tv_genres", ["genre_id"], name: "index_tv_genres_on_genre_id", using: :btree
  add_index "tv_genres", ["tv_show_id"], name: "index_tv_genres_on_tv_show_id", using: :btree

  create_table "tv_shows", force: true do |t|
    t.string   "title",                  null: false
    t.string   "photo"
    t.float    "rating"
    t.integer  "year_start"
    t.integer  "year_end"
    t.string   "status"
    t.integer  "seasons"
    t.text     "blurb"
    t.integer  "admin_id",   default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "network"
  end

  add_index "tv_shows", ["admin_id"], name: "index_tv_shows_on_admin_id", using: :btree
  add_index "tv_shows", ["title"], name: "index_tv_shows_on_title", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",                        null: false
    t.string   "email",                           null: false
    t.string   "password_digest",                 null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",           default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "watchlists", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "tv_show_id", null: false
    t.string   "status",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "watchlists", ["status"], name: "index_watchlists_on_status", using: :btree
  add_index "watchlists", ["user_id", "tv_show_id"], name: "index_watchlists_on_user_id_and_tv_show_id", unique: true, using: :btree

end
