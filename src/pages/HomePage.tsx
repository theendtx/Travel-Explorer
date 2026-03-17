import { Link } from "react-router-dom"

export function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Modern Travel Planner</span>
          <h1>Build trips that look organized before you even pack.</h1>
          <p>
            Explore countries, save favorites, and shape clean travel plans in a
            responsive interface that feels light on mobile and polished on desktop.
          </p>

          <div className="hero-actions">
            <Link to="/explore" className="cta-primary">
              Start exploring
            </Link>
            <Link to="/trips" className="cta-secondary">
              Plan a new trip
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>250+</strong>
              <span>countries to browse</span>
            </div>

            <div className="hero-stat">
              <strong>3 views</strong>
              <span>mobile, tablet, desktop ready</span>
            </div>

            <div className="hero-stat">
              <strong>Smooth UI</strong>
              <span>hover motion and page transitions</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glass-panel itinerary-card">
            <div className="itinerary-stop">
              <div>
                <strong>Morning</strong>
                <span>Seaside breakfast in Lisbon</span>
              </div>
              <strong>08:30</strong>
            </div>

            <div className="itinerary-stop">
              <div>
                <strong>Afternoon</strong>
                <span>Old city walk and gallery break</span>
              </div>
              <strong>14:00</strong>
            </div>

            <div className="itinerary-stop">
              <div>
                <strong>Evening</strong>
                <span>Sunset rooftop dinner</span>
              </div>
              <strong>19:15</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="features-grid">
        <article className="feature-card">
          <strong>Responsive Design</strong>
          <p className="section-copy">
            The layout adapts cleanly for mobile, tablet, and desktop without
            collapsing into crowded cards or oversized spacing.
          </p>
        </article>

        <article className="feature-card">
          <strong>Animations</strong>
          <p className="section-copy">
            Country cards rise on hover, while page sections fade in with subtle
            motion for a more premium feel.
          </p>
        </article>

        <article className="feature-card">
          <strong>Travel Workflow</strong>
          <p className="section-copy">
            Save favorite destinations, compare regions, and keep your trip ideas
            organized in one place.
          </p>
        </article>
      </section>
    </div>
  )
}
