export const API_URLS = {
  base: "http://localhost:3000/api",
  apiFootball: {
    leagueData: "/league_data",
    refresh: "/refresh_cache",
    updateMatch: "/match",
    updateDate: "/date",
  },
  bet: {
    predictions: "/predictions",
    bankroll: "/bankroll",
    new: "/new",
    myBets: "/my_bets",
    predictionsOutcomes: "/outcomes",
    cassandra: "/cassandra_bets",
  },
  auth: {
    login: "/login",
    signup: "/signup",
    logout: "/logout",
    check: "/check",
  },
};
