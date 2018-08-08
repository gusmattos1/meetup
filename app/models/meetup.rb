class Meetup
    include HTTParty
    base_uri 'api.meetup.com'
  
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
  
    def get_data
      self.class.get('/operation-code-hampton-roads/events', @options)
    end
  
    def events
      if get_data.code.to_i == 200
        get_data.parsed_response
      else
        raise "Error fetching data from Meetup API"
      end
    end
  end