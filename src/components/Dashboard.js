import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });
  const [goalData, setGoalData] = useState({
    weeklyGoal: 0,
  });
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:7002/dashboard/${userId}`)
        .then((response) => {
          const { data } = response;
          setDashboardData({
            daily: data.data.daily,
            weekly: data.data.weekly,
            monthly: data.data.monthly,
            yearly: data.data.yearly,
          });
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:7002/goals/${userId}`)
        .then((response) => {
          const { data } = response;
          const goal = data.data[0];
          setGoalData({
            weeklyGoal: goal ? goal.goal_amount : 0,
          });
        })
        .catch((error) => {
          console.error("Error fetching goal records:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:7002/spending-pie-chart/${userId}`)
        .then((response) => {
          const { data } = response;
          const labels = data.data.map((item) => item.category);
          const chartData = data.data.map((item) => item.total_spent);

          setPieChartData({
            labels: labels,
            datasets: [
              {
                label: "Spending by Category",
                data: chartData,
                backgroundColor: [
                  "#28a745",
                  "#ffc107",
                  "#007bff",
                  "#dc3545",
                  "#17a2b8",
                ],
                hoverBackgroundColor: [
                  "#218838",
                  "#e0a800",
                  "#0056b3",
                  "#c82333",
                  "#138496",
                ],
                borderWidth: 1,
              },
            ],
          });
        })
        .catch((error) => {
          console.error("Error fetching pie chart data:", error);
        });
    }
  }, [userId]);

  const getGoalStatus = () => {
    const { weeklyGoal } = goalData;
    const { weekly } = dashboardData;

    if (weekly < weeklyGoal) {
      return {
        color: "bg-success",
        emoji: "🙂",
      };
    } else if (weekly === weeklyGoal) {
      return {
        color: "bg-warning",
        emoji: "😐",
      };
    } else {
      return {
        color: "bg-danger",
        emoji: "😢",
      };
    }
  };

  const doughnutChartData = {
    labels: ["Goal Progress", "Remaining Goal"],
    datasets: [
      {
        data: [
          dashboardData.weekly,
          goalData.weeklyGoal - dashboardData.weekly,
        ],
        backgroundColor: ["#28a745", "#e0e0e0"],
        hoverBackgroundColor: ["#218838", "#d0d0d0"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    cutoutPercentage: 60,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const { color, emoji } = getGoalStatus();

  const cards = [
    {
      title: `Weekly Goal ${emoji}`,
      description: `Your progress this week! ${emoji}`,
      bgColor: color,
      value: dashboardData.weekly,
      goalValue: goalData.weeklyGoal,
    },
    {
      title: "Daily 🏃",
      description: "Track your daily Spends. Every Penny counts!",
      bgColor: "bg-success",
      value: dashboardData.daily,
    },
    {
      title: "Weekly 🗓️",
      description: "Review your achievements this week. Let's see how you're doing!",
      bgColor: "bg-info",
      value: dashboardData.weekly,
    },
    {
      title: "Monthly 📅",
      description: "Analyze your monthly growth. You've come a long way!",
      bgColor: "bg-danger",
      value: dashboardData.monthly,
    },
    {
      title: "Yearly 🎉",
      description: "Summarize your yearly accomplishments. Almost there!",
      bgColor: "bg-primary",
      value: dashboardData.yearly,
    },
  ];

  // Motivational quotes based on progress and spending habits
const weeklyQuotes = [
    { threshold: 0.5, quote: "Keep going, you're halfway there!" },
    { threshold: 1, quote: "You did it! Goal achieved!" },
    { threshold: 0, quote: "Don't stop now, you got this!" },
    { threshold: -1, quote: "Uh-oh, you've overspent. Time to tighten the budget!" }, // New quote for overspending
    { threshold: -2, quote: "Spend wisely! Every pound saved is a step closer to your goal." }, // Motivational for saving
  ];
  
  const getWeeklyQuote = () => {
    const progress = dashboardData.weekly / goalData.weeklyGoal;
    const overspend = dashboardData.weekly > goalData.weeklyGoal;
  
    // If overspent, show a quote encouraging saving
    if (overspend) {
      const quote = weeklyQuotes.find((quote) => progress <= 0); // Finds quotes for overspending
      return quote ? quote.quote : "Stay on track, you can do this!";
    }
  
    // Otherwise, show a progress-based quote
    const quote = weeklyQuotes.find((quote) => progress >= quote.threshold);
    return quote ? quote.quote : "Keep pushing, success is near!";
  };

  return (
    <div className="dashboard-container container py-5">
      <h1 className="text-center mb-4">Dashboard</h1>

      {/* Motivational Quote Section */}
      <div className="quote-section text-center mb-5">
        <h3>{getWeeklyQuote()}</h3>
      </div>

      {/* Cards Section */}
      <div className="row g-4 mb-5">
        {cards.map((card, index) => (
          <div className="col-md-4 col-lg-3 mx-auto" key={index}>
            <div className={`card text-white ${card.bgColor} h-100`}>
              <div className="card-body text-center">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
                <h3>£{card.value}</h3> {/* Change from $ to £ */}
                {card.goalValue && (
                  <div className="mt-3">
                    <p><strong>Weekly Goal: </strong>£{card.goalValue}</p> {/* Change from $ to £ */}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Donut Chart and Pie Chart Side by Side */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-6">
          <h2 className="text-center mb-4">Weekly Goal Progress</h2>
          <div className="chart-container d-flex justify-content-center">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>

        <div className="col-md-6 col-lg-6">
          <h2 className="text-center mb-4">Spending by Category</h2>
          <div className="chart-container d-flex justify-content-center">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
