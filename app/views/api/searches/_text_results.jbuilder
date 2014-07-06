json.extract! search
json.tv_results @tv_results, partial: 'api/tv/tv_result', as: :tv_show
json.user_results @user_results, partial: 'api/users/follow', as: :user