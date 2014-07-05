json.extract! tv_show, :id, :title, :rating, :genre_names, :blurb
json.photo_medium tv_show.photo.url(:medium)
json.photo_thumb tv_show.photo.url(:thumb)