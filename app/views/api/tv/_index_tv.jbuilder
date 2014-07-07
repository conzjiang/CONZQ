json.extract! tv_show, :id, :title
json.photo_medium tv_show.photo.url(:medium)