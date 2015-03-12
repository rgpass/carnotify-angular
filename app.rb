require 'rubygems'
require 'bundler'
require 'pry'
Bundler.require

require 'sinatra/asset_pipeline'
require 'sinatra/cookies'

class App < Sinatra::Base
  # Logical paths to your assets
  set :assets_prefix, %w(assets vendor/assets)

  register Sinatra::AssetPipeline
  helpers Sinatra::Cookies

  get '/' do
    slim :welcome
  end

  get '/signup' do
    slim :signup
  end

  post '/signup' do
    api_response = HTTParty.post('https://carnotify-api.herokuapp.com/api/v1/users', query: params)
    remember_token = api_response.headers['set-cookie'].split(';')[1].split('remember_token=').last
    expiration = Time.parse(api_response.headers['set-cookie'].split(';').last.split('=').last)
    response.set_cookie "remember_token", {:value => remember_token, :expires => (expiration)}
    redirect '/app/#/select'
  end

  get '/signin' do
    slim :signin
  end

  post '/signin' do
    api_response = HTTParty.post('https://carnotify-api.herokuapp.com/api/v1/sessions', query: params)
    remember_token = api_response.headers['set-cookie'].split(';')[1].split('remember_token=').last
    expiration = Time.parse(api_response.headers['set-cookie'].split(';').last.split('=').last)
    response.set_cookie "remember_token", {:value => remember_token, :expires => (expiration)}
    redirect '/app/#/select'
  end


  get '/signout' do
    HTTParty.delete('https://carnotify-api.herokuapp.com/api/v1/signout', cookies: { remember_token: cookies['remember_token'] })
    response.delete_cookie 'remember_token'
    redirect '/'
  end

  get '/app/' do
    redirect '/' unless cookies['remember_token']
    slim :main
  end

  get '/api/v1/*' do
    # TODO: Discuss if we want this -- will make it so no
    # features without being signed in
    redirect '/' unless cookies['remember_token']
    end_point = params[:splat].first
    query_params = URI.encode_www_form(params)
    binding.pry
    HTTParty.get("https://carnotify-api.herokuapp.com/api/v1/#{end_point}?#{query_params}", cookies: { remember_token: cookies['remember_token'] }).to_json
    # If bad cookie/error/unauthorized, need to alert user with a flash message
  end

  get '/app/partials/*' do
    slim :"angular_partials/#{params[:splat].first}", layout: false
  end

  not_found do
    status 404
    slim :oops
  end
end
