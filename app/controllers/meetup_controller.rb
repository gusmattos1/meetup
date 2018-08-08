class MeetupController < ApplicationController
  def index

    latitude    = params[:lat]
    longitude   = params[:lng]


    @events = Meetup.new.events(latitude, longitude)
    render json: @events, status: :ok
  rescue StandardError => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  def show

    urlname    = params[:urlname]
    event_id   = params[:event_id]

    @selectec_event = Meetup.new.selected_event(urlname, event_id)

    render json: @selectec_event, status: :ok
  end
end