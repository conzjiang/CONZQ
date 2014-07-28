json.extract! tv_show, :id, :title, :genre_names, :rating, :network, :seasons, :year_start, :year_end, :blurb, :admin_id

json.photo_big tv_show.photo.url(:big)

json.posts tv_show.posts, partial: 'api/posts/user_post', as: :post