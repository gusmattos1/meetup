class Meetup
    include HTTParty

# set the URL for API request
  base_uri 'api.meetup.com'

  # Set the options for API request

    attr_reader :options


    def initialize
      api_key  = '5e4d3812121c65223f56467776e5912'
      @options = {
        query: {
          key: api_key,
          sign: "true",
          desc: "true",
          page: 20
        }
      }
    end
  
    def get_data (latitude, longitude)
      self.class.get('/find/upcoming_events?key=5e4d3812121c65223f56467776e5912&fields=featured_photo&sign=true&photo-host=public&lon=' + longitude + '&page=20&radius=smart&lat=' + latitude, @options)
    end
  
    def events (latitude, longitude)
      if get_data(latitude, longitude).code.to_i == 200
        get_data(latitude, longitude).parsed_response
      else
        raise "Error fetching data from Meetup API"
      end
    end

    def get_selected_event(urlname, event_id)
      self.class.get('/' + urlname + '/events/' + event_id + '?&sign=true&fields=featured_photo')
    end
    
    def get_event_rsvps(urlname, event_id)
      self.class.get('/' + urlname + '/events/' + event_id + '/rsvps?&sign=true&photo-host=public')
    end

    def selected_event_rsvps (urlname, event_id)
      if get_event_rsvps(urlname, event_id).code.to_i == 200
        get_event_rsvps(urlname, event_id).parsed_response
      else
        raise "Error fetching data from Meetup API"
      end
    end

    def selected_event (urlname, event_id)
      if get_selected_event(urlname, event_id).code.to_i == 200
        get_selected_event(urlname, event_id).parsed_response
      else
        raise "Error fetching data from Meetup API"
      end
    end



  end