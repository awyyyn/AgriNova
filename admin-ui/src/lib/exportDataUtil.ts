import * as XLSX from "xlsx";
import { format } from "date-fns";

interface DashboardData {
	overview: any;
	weekly: any;
	distributions: any;
	topDiseases: Array<{ name: string; count: number }>;
	activeUsers: Array<any>;
	recentAnalyses: Array<any>;
}

/**
 * Export dashboard data to Excel
 */
export function exportToExcel(data: DashboardData, rangeName: string) {
	const workbook = XLSX.utils.book_new();

	// Sheet 1: Overview
	const overviewData = [
		["Dashboard Report", ""],
		["Generated", format(new Date(), "MMMM dd, yyyy HH:mm")],
		["Period", rangeName],
		["", ""],
		["Overview Metrics", ""],
		["Total Users", data.overview.totalUsers],
		["Total Analyses", data.overview.totalAnalyses],
		["Analyses with Pest", data.overview.totalWithPest],
		["Analyses without Pest", data.overview.totalWithoutPest],
		["Pest Detection Rate", `${data.overview.pestPercentage}%`],
		["Average Confidence", data.overview.averageConfidence],
		["", ""],
		["Period Metrics", ""],
		["New Users", data.weekly.newUsers],
		["Analyses Created", data.weekly.weeklyAnalyses],
		["Active Users", data.weekly.activeUsers],
	];
	const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
	XLSX.utils.book_append_sheet(workbook, overviewSheet, "Overview");

	// Sheet 2: Top Diseases
	const diseasesData = [
		["Disease Name", "Count"],
		...data.topDiseases.map((d) => [d.name, d.count]),
	];
	const diseasesSheet = XLSX.utils.aoa_to_sheet(diseasesData);
	XLSX.utils.book_append_sheet(workbook, diseasesSheet, "Top Diseases");

	// Sheet 3: Active Users
	const usersData = [
		["Name", "Email", "Role", "Analysis Count"],
		...data.activeUsers.map((u) => [u.name, u.email, u.role, u.analysisCount]),
	];
	const usersSheet = XLSX.utils.aoa_to_sheet(usersData);
	XLSX.utils.book_append_sheet(workbook, usersSheet, "Active Users");

	// Sheet 4: Recent Activity
	const activityData = [
		["ID", "Type", "Status", "Confidence", "User", "Date"],
		...data.recentAnalyses
			.slice(0, 50)
			.map((a) => [
				a.formattedId,
				a.type,
				a.hasPestFound ? "Pest Detected" : "Healthy",
				a.confidence + "%",
				a.user?.name || "N/A",
				a.createdAtRelative,
			]),
	];
	const activitySheet = XLSX.utils.aoa_to_sheet(activityData);
	XLSX.utils.book_append_sheet(workbook, activitySheet, "Recent Activity");

	// Download
	const fileName = `Dashboard-Report-${format(new Date(), "yyyy-MM-dd-HHmm")}.xlsx`;
	XLSX.writeFile(workbook, fileName);
}

/**
 * Export dashboard data to CSV
 */
export function exportToCSV(data: DashboardData, rangeName: string) {
	const csvData = [
		["Dashboard Report"],
		["Generated", format(new Date(), "MMMM dd, yyyy HH:mm")],
		["Period", rangeName],
		[],
		["Overview Metrics"],
		["Metric", "Value"],
		["Total Users", data.overview.totalUsers],
		["Total Analyses", data.overview.totalAnalyses],
		["Pest Detection Rate", `${data.overview.pestPercentage}%`],
		["Average Confidence", data.overview.averageConfidence],
		[],
		["Top Diseases"],
		["Disease", "Count"],
		...data.topDiseases.map((d) => [d.name, d.count]),
		[],
		["Active Users"],
		["Name", "Email", "Analysis Count"],
		...data.activeUsers.map((u) => [u.name, u.email, u.analysisCount]),
	];

	const csv = csvData.map((row) => row.join(",")).join("\n");
	const blob = new Blob([csv], { type: "text/csv" });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `Dashboard-Report-${format(new Date(), "yyyy-MM-dd-HHmm")}.csv`;
	a.click();
	window.URL.revokeObjectURL(url);
}

/**
 * Generate print-friendly HTML report
 */
export function generateHTMLReport(
	data: DashboardData,
	rangeName: string,
): string {
	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Dashboard Report - ${format(new Date(), "yyyy-MM-dd")}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #333;
    }
    h1 {
      color: #1a1a1a;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }
    h2 {
      color: #2563eb;
      margin-top: 30px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .meta {
      color: #6b7280;
      font-size: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      background: #f9fafb;
    }
    .card h3 {
      margin: 0 0 10px 0;
      color: #6b7280;
      font-size: 14px;
      font-weight: 500;
    }
    .card .value {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a1a;
    }
    .card .subtitle {
      color: #6b7280;
      font-size: 13px;
      margin-top: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    th {
      background: #f3f4f6;
      font-weight: 600;
      color: #374151;
    }
    tr:hover {
      background: #f9fafb;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .badge-success {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-danger {
      background: #fee2e2;
      color: #991b1b;
    }
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    @media print {
      body { padding: 20px; }
      .card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>AgriNova Dashboard Report</h1>
    <p class="meta">
      ${rangeName} | Generated on ${format(new Date(), "MMMM dd, yyyy 'at' HH:mm")}
    </p>
  </div>

  <h2>Overview Metrics</h2>
  <div class="grid">
    <div class="card">
      <h3>Total Users</h3>
      <div class="value">${data.overview.totalUsers.toLocaleString()}</div>
      <div class="subtitle">+${data.weekly.newUsers} this period</div>
    </div>
    <div class="card">
      <h3>Total Analyses</h3>
      <div class="value">${data.overview.totalAnalyses.toLocaleString()}</div>
      <div class="subtitle">${data.weekly.weeklyAnalyses} this period</div>
    </div>
    <div class="card">
      <h3>Pest Detection Rate</h3>
      <div class="value">${data.overview.pestPercentage}%</div>
      <div class="subtitle">${data.overview.totalWithPest} with pest</div>
    </div>
    <div class="card">
      <h3>Average Confidence</h3>
      <div class="value">${data.overview.averageConfidence}</div>
      <div class="subtitle">Model accuracy</div>
    </div>
  </div>

  <h2>Top Diseases (${data.topDiseases.length})</h2>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Disease Name</th>
        <th>Detection Count</th>
      </tr>
    </thead>
    <tbody>
      ${data.topDiseases
				.map(
					(disease, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${disease.name}</td>
          <td>${disease.count}</td>
        </tr>
      `,
				)
				.join("")}
    </tbody>
  </table>

  <h2>Most Active Users (${data.activeUsers.length})</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Analysis Count</th>
      </tr>
    </thead>
    <tbody>
      ${data.activeUsers
				.map(
					(user) => `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td><strong>${user.analysisCount}</strong></td>
        </tr>
      `,
				)
				.join("")}
    </tbody>
  </table>

  <h2>Recent Activity (Last ${Math.min(20, data.recentAnalyses.length)} analyses)</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Status</th>
        <th>Confidence</th>
        <th>User</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      ${data.recentAnalyses
				.slice(0, 20)
				.map(
					(analysis) => `
        <tr>
          <td>${analysis.formattedId}</td>
          <td>${analysis.type}</td>
          <td>
            <span class="badge ${analysis.hasPestFound ? "badge-danger" : "badge-success"}">
              ${analysis.hasPestFound ? "Pest Detected" : "Healthy"}
            </span>
          </td>
          <td>${analysis.confidence}%</td>
          <td>${analysis.user?.name || "N/A"}</td>
          <td>${analysis.createdAtRelative}</td>
        </tr>
      `,
				)
				.join("")}
    </tbody>
  </table>

  <div class="footer">
    <p>This report was generated automatically from the AgriNova system.</p>
    <p>© ${new Date().getFullYear()} AgriNova. All rights reserved.</p>
  </div>
</body>
</html>
  `;
}

/**
 * Print HTML report in new window
 */
export function printHTMLReport(data: DashboardData, rangeName: string) {
	const html = generateHTMLReport(data, rangeName);
	const printWindow = window.open("", "_blank");

	if (printWindow) {
		printWindow.document.write(html);
		printWindow.document.close();

		// Wait for content to load then print
		printWindow.onload = () => {
			printWindow.print();
		};
	}
}
