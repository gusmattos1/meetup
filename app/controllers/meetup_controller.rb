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
    @selected_event = Meetup.new.selected_event(urlname, event_id)
    @event_members = Meetup.new.selected_event_rsvps(urlname, event_id)

    new_event = Event.new(name: @selected_event['name'], photo: @selected_event['featured_photo']['photo_link'], urlname: urlname, event_id: event_id )
    if new_event.save
      p 'save'
      p new_event
    else 
      p 'updated'
      new_event = Event.find_by(event_id: event_id)
      new_event.updated_at = Time.now
      new_event.save
      p new_event
    end
  end
end